export const formatPrice = (preco = 0) => {
    return new Intl.NumberFormat('pt-BR', { style:'currency',currency:'BRL'}).format(preco)
}

//Função para juntar várias clases seguras
export function cn(...classes: (string | undefined | null)[]) {
    return classes.filter(Boolean).join(" ")
  }