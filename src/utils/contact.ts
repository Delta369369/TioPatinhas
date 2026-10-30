import { store } from '../config/store';
export function whatsappUrl(service?: string, packageName?: string, phone = store.whatsapp) {
 if (!/^55\d{10,11}$/.test(phone)) return null;
 const message = service ? `Olá! Gostaria de solicitar um orçamento para ${service}${packageName ? `, pacote ${packageName}` : ''}. Poderia me informar como funciona?` : 'Olá! Gostaria de conhecer os serviços e solicitar um orçamento.';
 return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
