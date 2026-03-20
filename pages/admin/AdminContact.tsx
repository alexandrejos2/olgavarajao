import React from 'react';
import SectionEditor from '../../components/admin/SectionEditor';

const AdminContact: React.FC = () => (
  <SectionEditor
    section="contact"
    title="Contacto"
    fields={[
      { key: 'sell_title', label: 'Titulo (modo vender)' },
      { key: 'sell_description', label: 'Descricao (modo vender)', type: 'textarea' },
      { key: 'buy_title', label: 'Titulo (modo comprar)' },
      { key: 'buy_description', label: 'Descricao (modo comprar)', type: 'textarea' },
      { key: 'phone', label: 'Telefone (visivel)' },
      { key: 'phone_raw', label: 'Telefone (para link, sem espacos)' },
      { key: 'email', label: 'Email' },
      { key: 'office_name', label: 'Nome do escritorio' },
      { key: 'office_address', label: 'Morada do escritorio' },
      { key: 'whatsapp_number', label: 'Numero WhatsApp (com indicativo)' },
      { key: 'maps_embed_url', label: 'URL do Google Maps embed', type: 'url' },
    ]}
  />
);

export default AdminContact;
