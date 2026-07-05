-- TAKLIFNOMA ONLINE ADMIN PANEL UCHUN SUPABASE SQL
-- Supabase > SQL Editor > New query ichiga to'liq tashlab RUN qiling.

create extension if not exists pgcrypto;

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9-]+$'),
  is_active boolean not null default true,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rsvp (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  guest_name text not null,
  answer text not null,
  wish text,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_invitations_updated_at on public.invitations;
create trigger set_invitations_updated_at
before update on public.invitations
for each row execute function public.set_updated_at();

alter table public.invitations enable row level security;
alter table public.rsvp enable row level security;

-- Eski policylar bo'lsa tozalash
drop policy if exists "Public can read active invitations" on public.invitations;
drop policy if exists "Owner can read invitations" on public.invitations;
drop policy if exists "Owner can insert invitations" on public.invitations;
drop policy if exists "Owner can update invitations" on public.invitations;
drop policy if exists "Owner can delete invitations" on public.invitations;

-- Saytga kirgan odam aktiv taklifnomani ko'ra oladi.
create policy "Public can read active invitations"
on public.invitations
for select
to anon, authenticated
using (is_active = true);

-- Admin o'zi yaratgan aktiv/yopiq taklifnomalarni ko'ra oladi.
create policy "Owner can read invitations"
on public.invitations
for select
to authenticated
using (user_id = auth.uid());

create policy "Owner can insert invitations"
on public.invitations
for insert
to authenticated
with check (user_id = auth.uid());

create policy "Owner can update invitations"
on public.invitations
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Owner can delete invitations"
on public.invitations
for delete
to authenticated
using (user_id = auth.uid());

-- RSVP policylar
drop policy if exists "Anyone can send RSVP to active invitation" on public.rsvp;
drop policy if exists "Owner can read RSVP" on public.rsvp;
drop policy if exists "Owner can delete RSVP" on public.rsvp;

create policy "Anyone can send RSVP to active invitation"
on public.rsvp
for insert
to anon, authenticated
with check (
  exists (
    select 1 from public.invitations i
    where i.id = invitation_id and i.is_active = true
  )
);

create policy "Owner can read RSVP"
on public.rsvp
for select
to authenticated
using (
  exists (
    select 1 from public.invitations i
    where i.id = invitation_id and i.user_id = auth.uid()
  )
);

create policy "Owner can delete RSVP"
on public.rsvp
for delete
to authenticated
using (
  exists (
    select 1 from public.invitations i
    where i.id = invitation_id and i.user_id = auth.uid()
  )
);

-- Storage bucket: musiqa va rasmlar uchun
insert into storage.buckets (id, name, public)
values ('taklifnoma-assets', 'taklifnoma-assets', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read taklifnoma assets" on storage.objects;
drop policy if exists "Authenticated upload taklifnoma assets" on storage.objects;
drop policy if exists "Authenticated update taklifnoma assets" on storage.objects;
drop policy if exists "Authenticated delete taklifnoma assets" on storage.objects;

create policy "Public read taklifnoma assets"
on storage.objects
for select
to public
using (bucket_id = 'taklifnoma-assets');

create policy "Authenticated upload taklifnoma assets"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'taklifnoma-assets');

create policy "Authenticated update taklifnoma assets"
on storage.objects
for update
to authenticated
using (bucket_id = 'taklifnoma-assets')
with check (bucket_id = 'taklifnoma-assets');

create policy "Authenticated delete taklifnoma assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'taklifnoma-assets');
