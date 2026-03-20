import React from 'react';
import SectionEditor from '../../components/admin/SectionEditor';

const AdminHero: React.FC = () => (
  <SectionEditor
    section="hero"
    title="Hero"
    fields={[
      { key: 'badge', label: 'Badge (texto superior)' },
      { key: 'title', label: 'Titulo principal', type: 'textarea' },
      { key: 'subtitle', label: 'Subtitulo', type: 'textarea' },
      { key: 'cta_primary', label: 'Texto botao principal' },
      { key: 'cta_secondary', label: 'Texto botao secundario' },
      { key: 'profile_image_url', label: 'URL da imagem de perfil', type: 'url' },
      { key: 'whatsapp_url', label: 'URL WhatsApp', type: 'url' },
    ]}
  />
);

export default AdminHero;
