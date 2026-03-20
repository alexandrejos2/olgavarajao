import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export function useSiteContent(section: string): Record<string, string> {
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase
      .from('site_content')
      .select('key, value')
      .eq('section', section)
      .then(({ data }) => {
        if (data) {
          const map: Record<string, string> = {};
          data.forEach((row) => {
            map[row.key] = row.value;
          });
          setContent(map);
        }
      });
  }, [section]);

  return content;
}

export interface Award {
  id: string;
  name: string;
  image_url: string;
  sort_order: number;
}

export function useAwards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('awards')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data) setAwards(data);
        setLoading(false);
      });
  }, []);

  return { awards, loading };
}

export interface ServiceRow {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  category: 'sell' | 'buy';
  sort_order: number;
}

export function useServices() {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('services')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data) setServices(data);
        setLoading(false);
      });
  }, []);

  return { services, loading };
}

export interface PropertyRow {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  image_url: string;
  status: string;
  is_featured: boolean;
  sort_order: number;
}

export function useProperties() {
  const [properties, setProperties] = useState<PropertyRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('properties')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data) setProperties(data);
        setLoading(false);
      });
  }, []);

  return { properties, loading };
}

export interface TestimonialRow {
  id: string;
  text: string;
  author: string;
  role: string;
  avatar_url: string | null;
  sort_order: number;
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data) setTestimonials(data);
        setLoading(false);
      });
  }, []);

  return { testimonials, loading };
}

export interface FAQRow {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}

export function useFAQs() {
  const [faqs, setFAQs] = useState<FAQRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('faqs')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        if (data) setFAQs(data);
        setLoading(false);
      });
  }, []);

  return { faqs, loading };
}
