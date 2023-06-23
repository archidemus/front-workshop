export default {
  content: `1. El Estado deberá servir a las personas y a la sociedad y su finalidad es promover el bien común, para lo cual debe crear las condiciones sociales que permitan a todos y cada uno de los integrantes de la comunidad nacional su mayor realización espiritual y material posible, con pleno respeto a los derechos y garantías que esta Constitución establece. 
2. El Estado promoverá las condiciones de justicia y solidaridad para que la libertad, derechos e igualdad de las personas se realicen, removiendo los obstáculos que lo impidan o dificulten.`,
  onHoverChange: (highlight) =>
    console.log(`Highlight ${JSON.stringify(highlight)} hovered`),
  highlights: [
    {
      __typename: 'Highlight',
      start: 60,
      len: 47,
      match: {
        __typename: 'Match',
        documento_id: 'constitucion_actual',
        start: 357,
        len: 47,
        file_path:
          '43b9bb06300a06513a1a5471ff9bd7669aba01bed76f02c26175495983b49358.yml',
      },
      color: '#FF71B1',
      finish: 107,
    },
    {
      __typename: 'Highlight',
      start: 118,
      len: 212,
      match: {
        __typename: 'Match',
        documento_id: 'constitucion_actual',
        start: 428,
        len: 214,
        file_path:
          '43b9bb06300a06513a1a5471ff9bd7669aba01bed76f02c26175495983b49358.yml',
      },
      color: '#FF71B1',
      finish: 330,
    },
    {
      __typename: 'Highlight',
      start: 85,
      len: 38,
      match: {
        __typename: 'Match',
        documento_id: 'constitucion_mb',
        start: 61,
        len: 38,
        file_path:
          '34d0d791075ddacab8d4ecc6e9a18300d77e7b3ef7110e72eba224a7a18c6da8.yml',
      },
      color: '#F8C224',
      finish: 123,
    },
  ],
};
