import React from 'react';
import SectionEditor from '../../components/admin/SectionEditor';

const AdminServices: React.FC = () => (
  <SectionEditor
    section="services"
    title="Servicos - Textos"
    fields={[
      { key: 'tab_sell', label: 'Tab Vender' },
      { key: 'tab_buy', label: 'Tab Comprar' },
      { key: 'sell_title', label: 'Titulo (Vender)' },
      { key: 'sell_subtitle', label: 'Subtitulo (Vender)', type: 'textarea' },
      { key: 'buy_title', label: 'Titulo (Comprar)' },
      { key: 'buy_subtitle', label: 'Subtitulo (Comprar)', type: 'textarea' },
      { key: 'cta_text', label: 'Texto do botao CTA' },
    ]}
  />
);

export default AdminServices;
