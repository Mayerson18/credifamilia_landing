import { Component } from '@angular/core';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class FaqComponent {
  faqs: FAQ[] = [
    {
      id: 1,
      question: '¿Qué es Credifamilia?',
      answer: 'Credifamilia es una entidad vigilada por la Superintendencia Financiera de Colombia, con calificación AA- otorgada por BRC Standard & Poor\'s, lo que te garantiza total confianza y respaldo. Desde nuestro inicio de operación en enero de 2011, hemos expandido nuestra presencia a Bogotá, Medellín, Cali, Bucaramanga, Barranquilla, Pereira y Armenia, logrando importantes resultados que reflejan nuestro compromiso con nuestros clientes.',
      isOpen: false
    },
    {
      id: 2,
      question: '¿Qué es un crédito de acabados?',
      answer: 'Es un préstamo para que puedas terminar tu vivienda nueva VIS en obra gris o blanca. Puedes cubrir gastos como pisos, cocina, baños, closets, pintura y demás detalles que hacen que tu hogar quede listo para habitar.',
      isOpen: false
    },
    {
      id: 3,
      question: '¿Qué beneficios tiene el crédito de acabados de Credifamilia?',
      answer: 'Te permite terminar la vivienda VIS nueva a tu gusto, contando con el respaldo de una empresa de acabados experta. La solicitud es 100% digital y con respuesta inmediata. [solo debes realizarla, aquí link] Contamos con Flexibilidad en plazos y montos. No necesitas tener tu crédito hipotecario con Credifamilia.',
      isOpen: false
    },
    {
      id: 4,
      question: '¿Cuáles son los requisitos para el crédito para mejoras de vivienda?',
      answer: 'Los requisitos son simples en Credifamilia: Ser mayor de 20 años. Tener ingresos estables y comprobables. Contar con un buen historial financiero. Contar con una vivienda VIS en obra gris o que necesite acabados.',
      isOpen: false
    },
    {
      id: 5,
      question: '¿Cómo solicitar crédito para remodelación de vivienda en Credifamilia?',
      answer: 'El proceso para acceder a nuestro crédito de acabados es muy fácil y lo puedes solicitar aquí, realiza la solicitud en línea y si el crédito es viable te indicaremos el monto máximo que te prestamos para terminar tu vivienda, un asesor te contactará para continuar con el proceso y te remitirá con una de nuestras empresas de acabados aliadas para que cotices, selecciones y decidas los acabados.',
      isOpen: false
    },
    {
      id: 6,
      question: '¿Dónde puedo solicitar crédito para remodelación de vivienda?',
      answer: 'Puedes solicitar tu crédito desde cualquier lugar de Colombia a través de nuestra plataforma digital. Tenemos presencia en Bogotá, Medellín, Cali, Bucaramanga, Barranquilla, Pereira y Armenia con aliados constructores en cada ciudad.',
      isOpen: false
    },
    {
      id: 7,
      question: '¿Quién puede solicitar un crédito de acabados?',
      answer: 'El crédito para remodelación de vivienda puede solicitarlo cualquier persona que tenga una vivienda nueva VIS en obra gris, sin importar si adquirió el crédito hipotecario con Credifamilia o con otra entidad.',
      isOpen: false
    }
  ];

  toggleFaq(id: number) {
    const faq = this.faqs.find(f => f.id === id);
    if (faq) {
      faq.isOpen = !faq.isOpen;
    }
  }
}
