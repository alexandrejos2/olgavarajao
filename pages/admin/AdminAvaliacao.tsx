import React from 'react';
import SectionEditor from '../../components/admin/SectionEditor';

const AdminAvaliacao: React.FC = () => (
  <div className="space-y-10">
    <SectionEditor
      section="avaliacao_hero"
      title="Avaliacao - Hero"
      fields={[
        { key: 'badge', label: 'Badge' },
        { key: 'heading', label: 'Titulo' },
        { key: 'heading_highlight', label: 'Titulo (destaque)' },
        { key: 'subtitle', label: 'Subtitulo', type: 'textarea' },
        { key: 'cta_text', label: 'Texto do botao' },
        { key: 'cta_subtext', label: 'Texto abaixo do botao' },
        { key: 'profile_image_url', label: 'URL imagem perfil', type: 'url' },
        { key: 'profile_name', label: 'Nome' },
        { key: 'profile_role', label: 'Funcao' },
        { key: 'stat_1_value', label: 'Stat 1 - Valor' },
        { key: 'stat_1_label', label: 'Stat 1 - Label' },
        { key: 'stat_2_value', label: 'Stat 2 - Valor' },
        { key: 'stat_2_label', label: 'Stat 2 - Label' },
      ]}
    />
    <SectionEditor
      section="avaliacao_diferenciacao"
      title="Avaliacao - Diferenciacao"
      fields={[
        { key: 'heading', label: 'Titulo' },
        { key: 'paragraph_1', label: 'Paragrafo 1', type: 'textarea' },
        { key: 'paragraph_2', label: 'Paragrafo 2', type: 'textarea' },
        { key: 'paragraph_3', label: 'Paragrafo 3', type: 'textarea' },
        { key: 'bullet_1', label: 'Ponto 1' },
        { key: 'bullet_2', label: 'Ponto 2' },
        { key: 'bullet_3', label: 'Ponto 3' },
        { key: 'bullet_4', label: 'Ponto 4' },
      ]}
    />
    <SectionEditor
      section="avaliacao_provas"
      title="Avaliacao - Provas Sociais"
      fields={[
        { key: 'section_label', label: 'Titulo da seccao' },
        { key: 'stat_1_value', label: 'Stat 1 - Valor' },
        { key: 'stat_1_label', label: 'Stat 1 - Label' },
        { key: 'stat_1_sub', label: 'Stat 1 - Subtitulo' },
        { key: 'stat_2_value', label: 'Stat 2 - Valor' },
        { key: 'stat_2_label', label: 'Stat 2 - Label' },
        { key: 'stat_2_sub', label: 'Stat 2 - Subtitulo' },
        { key: 'stat_3_value', label: 'Stat 3 - Valor' },
        { key: 'stat_3_label', label: 'Stat 3 - Label' },
        { key: 'stat_3_sub', label: 'Stat 3 - Subtitulo' },
      ]}
    />
    <SectionEditor
      section="avaliacao_cta"
      title="Avaliacao - CTA"
      fields={[
        { key: 'heading', label: 'Titulo' },
        { key: 'subtitle', label: 'Subtitulo', type: 'textarea' },
        { key: 'button_text', label: 'Texto do botao' },
        { key: 'button_subtext', label: 'Texto abaixo do botao' },
      ]}
    />
  </div>
);

export default AdminAvaliacao;
