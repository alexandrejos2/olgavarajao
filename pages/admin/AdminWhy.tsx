import React from 'react';
import SectionEditor from '../../components/admin/SectionEditor';

const AdminWhy: React.FC = () => (
  <SectionEditor
    section="why_work_with_me"
    title="Porque Trabalhar Comigo"
    fields={[
      { key: 'badge', label: 'Badge' },
      { key: 'heading', label: 'Titulo' },
      { key: 'heading_highlight', label: 'Titulo (destaque)' },
      { key: 'description', label: 'Descricao', type: 'textarea' },
      { key: 'cta_text', label: 'Texto do botao' },
      { key: 'card_1_title', label: 'Card 1 - Titulo' },
      { key: 'card_1_description', label: 'Card 1 - Descricao', type: 'textarea' },
      { key: 'card_1_icon', label: 'Card 1 - Icone (Target, ShieldCheck, TrendingUp, Sparkles)' },
      { key: 'card_2_title', label: 'Card 2 - Titulo' },
      { key: 'card_2_description', label: 'Card 2 - Descricao', type: 'textarea' },
      { key: 'card_2_icon', label: 'Card 2 - Icone' },
      { key: 'card_3_title', label: 'Card 3 - Titulo' },
      { key: 'card_3_description', label: 'Card 3 - Descricao', type: 'textarea' },
      { key: 'card_3_icon', label: 'Card 3 - Icone' },
      { key: 'card_4_title', label: 'Card 4 - Titulo' },
      { key: 'card_4_description', label: 'Card 4 - Descricao', type: 'textarea' },
      { key: 'card_4_icon', label: 'Card 4 - Icone' },
    ]}
  />
);

export default AdminWhy;
