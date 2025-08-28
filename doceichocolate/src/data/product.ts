

import bolo from '@/assets/bolo.png';
import boloTopo from '@/assets/bolo-topo.png';


export const product = [
  {
    id: '1',
    name: '1 bentô cake e 3 docinhos',
    description: 'Presente personalizável à sua maneira. Com 10 cm de diâmetro, 2 camadas de bolo e 1...',
    price: 75.00,
    image: [bolo, boloTopo],
    category: 'Bentô Cakes',
    isNew: true,
  },
  {
    id: '2',
    name: 'Bentô Cake Personalizado',
    description: 'Delicioso bentô cake personalizado com sua mensagem especial. Sabores variados disponíveis.',
    price: 85.00,
    image: [bolo, boloTopo],
    category: 'Bentô Cakes',
  },
  {
    id: '3',
    name: 'Kit Festa Bentô',
    description: '3 bentô cakes + 6 docinhos variados. Perfeito para pequenas celebrações.',
    price: 180.00,
    image: [bolo, boloTopo],
    category: 'Kits',
    isNew: true,
  },
  {
    id: '4',
    name: 'Bentô Cake Chocolate',
    description: 'Bentô cake de chocolate com cobertura cremosa e decoração especial.',
    price: 70.00,
    image: [bolo, boloTopo],
    category: 'Bentô Cakes',
  },
  {
    id: '5',
    name: 'Bentô Cake Morango',
    description: 'Delicado bentô cake de morango com chantilly e morangos frescos.',
    price: 78.00,
    image: [bolo, boloTopo],
    category: 'Bentô Cakes',
  },
  {
    id: '6',
    name: 'Docinhos Gourmet',
    description: 'Seleção de 12 docinhos gourmet variados: brigadeiro, beijinho, casadinho e mais.',
    price: 45.00,
    image: [bolo, boloTopo],
    category: 'Docinhos',
  },
  {
    id: '7',
    name: 'Bentô Cake Red Velvet',
    description: 'Exclusivo bentô cake red velvet com cream cheese e decoração romântica.',
    price: 88.00,
    image: [bolo, boloTopo],
    category: 'Bentô Cakes',
    isNew: true,
  },
  {
    id: '8',
    name: 'Mini Cupcakes',
    description: 'Kit com 6 mini cupcakes de sabores variados com cobertura artesanal.',
    price: 35.00,
    image: [bolo, boloTopo],
    category: 'Cupcakes',
  },
];

export const categories = ['Bentô Cakes', 'Docinhos', 'Cupcakes', 'Kits'];