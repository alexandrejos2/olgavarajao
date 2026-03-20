/*
  # Fix RLS policy performance and security

  1. Performance
    - Replace `auth.uid()` with `(select auth.uid())` in all policies across all tables
    - This prevents re-evaluation of the auth function for each row, improving query performance

  2. Security
    - Replace unrestricted `WITH CHECK (true)` on form_submissions INSERT
    - New policy restricts inserts to valid submission types ('contacto', 'avaliacao') only

  3. Cleanup
    - Drop unused indexes: idx_form_submissions_type, idx_form_submissions_status

  4. Affected Tables
    - site_content (insert, update, delete policies)
    - awards (insert, update, delete policies)
    - services (insert, update, delete policies)
    - properties (insert, update, delete policies)
    - testimonials (insert, update, delete policies)
    - faqs (insert, update, delete policies)
    - form_submissions (select, insert, update, delete policies)
*/

-- site_content
DROP POLICY IF EXISTS "Authenticated users can insert site content" ON site_content;
CREATE POLICY "Authenticated users can insert site content"
  ON site_content FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can update site content" ON site_content;
CREATE POLICY "Authenticated users can update site content"
  ON site_content FOR UPDATE TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can delete site content" ON site_content;
CREATE POLICY "Authenticated users can delete site content"
  ON site_content FOR DELETE TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- awards
DROP POLICY IF EXISTS "Authenticated users can insert awards" ON awards;
CREATE POLICY "Authenticated users can insert awards"
  ON awards FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can update awards" ON awards;
CREATE POLICY "Authenticated users can update awards"
  ON awards FOR UPDATE TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can delete awards" ON awards;
CREATE POLICY "Authenticated users can delete awards"
  ON awards FOR DELETE TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- services
DROP POLICY IF EXISTS "Authenticated users can insert services" ON services;
CREATE POLICY "Authenticated users can insert services"
  ON services FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can update services" ON services;
CREATE POLICY "Authenticated users can update services"
  ON services FOR UPDATE TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can delete services" ON services;
CREATE POLICY "Authenticated users can delete services"
  ON services FOR DELETE TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- properties
DROP POLICY IF EXISTS "Authenticated users can insert properties" ON properties;
CREATE POLICY "Authenticated users can insert properties"
  ON properties FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can update properties" ON properties;
CREATE POLICY "Authenticated users can update properties"
  ON properties FOR UPDATE TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can delete properties" ON properties;
CREATE POLICY "Authenticated users can delete properties"
  ON properties FOR DELETE TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- testimonials
DROP POLICY IF EXISTS "Authenticated users can insert testimonials" ON testimonials;
CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON testimonials;
CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials FOR UPDATE TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON testimonials;
CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials FOR DELETE TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- faqs
DROP POLICY IF EXISTS "Authenticated users can insert faqs" ON faqs;
CREATE POLICY "Authenticated users can insert faqs"
  ON faqs FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can update faqs" ON faqs;
CREATE POLICY "Authenticated users can update faqs"
  ON faqs FOR UPDATE TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can delete faqs" ON faqs;
CREATE POLICY "Authenticated users can delete faqs"
  ON faqs FOR DELETE TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- form_submissions: fix auth.uid() -> (select auth.uid())
DROP POLICY IF EXISTS "Authenticated users can read form submissions" ON form_submissions;
CREATE POLICY "Authenticated users can read form submissions"
  ON form_submissions FOR SELECT TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can update form submissions" ON form_submissions;
CREATE POLICY "Authenticated users can update form submissions"
  ON form_submissions FOR UPDATE TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can delete form submissions" ON form_submissions;
CREATE POLICY "Authenticated users can delete form submissions"
  ON form_submissions FOR DELETE TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- form_submissions: restrict INSERT to valid types only (replaces WITH CHECK true)
DROP POLICY IF EXISTS "Anon can insert form submissions" ON form_submissions;
CREATE POLICY "Anon can insert form submissions"
  ON form_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (type IN ('contacto', 'avaliacao'));

-- Drop unused indexes
DROP INDEX IF EXISTS idx_form_submissions_type;
DROP INDEX IF EXISTS idx_form_submissions_status;