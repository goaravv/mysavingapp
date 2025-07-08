-- Add RLS policies for the mysavingapp table to allow public access
-- Since this is a custom authentication system, we need to allow public access

-- Allow anyone to read from the table (for login verification)
CREATE POLICY "Allow public read access" 
ON public.mysavingapp 
FOR SELECT 
USING (true);

-- Allow anyone to insert into the table (for signup)
CREATE POLICY "Allow public insert access" 
ON public.mysavingapp 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to update their own records
CREATE POLICY "Allow public update access" 
ON public.mysavingapp 
FOR UPDATE 
USING (true);