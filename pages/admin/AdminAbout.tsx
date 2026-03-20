import React from 'react';
import SectionEditor from '../../components/admin/SectionEditor';

const AdminAbout: React.FC = () => (
  <SectionEditor
    section="about"
    title="Sobre Mim"
    fields={[
      { key: 'heading_line1', label: 'Titulo - Linha 1' },
      { key: 'heading_line2', label: 'Titulo - Linha 2' },
      { key: 'heading_line3', label: 'Titulo - Linha 3 (destaque)' },
      { key: 'bio_paragraph_1', label: 'Paragrafo 1', type: 'textarea' },
      { key: 'bio_paragraph_2', label: 'Paragrafo 2', type: 'textarea' },
      { key: 'bio_paragraph_3', label: 'Paragrafo 3 (destaque)', type: 'textarea' },
      { key: 'profile_image_url', label: 'URL da foto de perfil', type: 'url' },
      { key: 'profile_name', label: 'Nome no cartao' },
      { key: 'profile_subtitle', label: 'Subtitulo no cartao' },
      { key: 'stat_1_value', label: 'Estatistica 1 - Valor' },
      { key: 'stat_1_label', label: 'Estatistica 1 - Label' },
      { key: 'stat_2_value', label: 'Estatistica 2 - Valor' },
      { key: 'stat_2_label', label: 'Estatistica 2 - Label' },
      { key: 'stat_3_value', label: 'Estatistica 3 - Valor' },
      { key: 'stat_3_label', label: 'Estatistica 3 - Label' },
    ]}
  />
);

export default AdminAbout;
