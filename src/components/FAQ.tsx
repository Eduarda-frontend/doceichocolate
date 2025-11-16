"use client";

import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";


interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Quais formas de pagamento vocês aceitam?",
    answer:
      "Aceitamos Pix, cartão de crédito, débito e algumas carteiras digitais. Em compras personalizadas, também trabalhamos com pagamento antecipado via Pix.",
  },
  {
    question: "Com quanto tempo de antecedência devo fazer um pedido personalizado?",
    answer:
      "Para bolos e doces personalizados, recomendamos o pedido com pelo menos 3 a 5 dias de antecedência. Em datas especiais (Dia das Mães, Páscoa, Natal), o ideal é solicitar ainda mais cedo.",
  },
  {
    question: "Vocês entregam? Como funciona a entrega?",
    answer:
      "Sim! Fazemos entregas em toda a cidade por taxa fixa. O valor é calculado automaticamente no checkout de acordo com sua localização.",
  },
  {
    question: "Os produtos são frescos? Como são armazenados?",
    answer:
      "Sim! Tudo é produzido sob demanda, com ingredientes frescos. Utilizamos embalagens adequadas para transporte e conservação, garantindo qualidade até a entrega.",
  },
  {
    question: "Posso personalizar sabores, recheios e decoração?",
    answer:
      "Com certeza! Você pode escolher massa, recheio, decoração e adicionar uma referência de imagem. No checkout, você visualiza o resumo antes de finalizar.",
  },
  {
    question: "Vocês fazem devolução ou troca?",
    answer:
      "Por se tratar de produtos alimentícios, não realizamos devoluções. Mas se houver qualquer problema com a sua encomenda, entre em contato que resolvemos imediatamente.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="space-y-6 max-w-5xl mx-auto my-12">
      <div className="container flex flex-col gap-10">
        <h2 className="text-3xl font-principal font-bold text-foreground text-center">
          Perguntas Frequentes
        </h2>

        <div className="mx-auto w-full max-w-3xl space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-card shadow-card rounded-xl p-4 transition-all"
            >
              <button
                onClick={() => toggle(index)}
                className="flex justify-between w-full items-center text-left"
              >
                <span className="font-secundario text-lg text-foreground">
                  {item.question}
                </span>
                <HiOutlineChevronDown 
                  className={`h-5 w-5 transition-transform ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all ${
                  openIndex === index ? "max-h-40 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-muted-foreground text-base leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
