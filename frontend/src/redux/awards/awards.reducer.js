const INITIAL_STATE = {
  cardInfo: [
    {
      id: 1,
      alt: 'Premios',
      url: require('../../pages/about/images/gallery/img1.jpg').default,
      title: 'Premio a la juventud',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates accusantium velit id consequuntur dolor quas ea eum, sapiente quaerat vel ipsam nesciunt, delectus eaque consectetur',
    },
    {
      id: 2,
      alt: 'Premios',
      url: require('../../pages/about/images/gallery/img2.jpg').default,
      title: 'Premio a la juventud',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates accusantium velit id consequuntur dolor quas ea eum, sapiente quaerat vel ipsam nesciunt, delectus eaque consectetur',
    },
    {
      id: 3,
      alt: 'Premios',
      url: require('../../pages/about/images/gallery/img3.jpg').default,
      title: 'Premio a la juventud',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates accusantium velit id consequuntur dolor quas ea eum, sapiente quaerat vel ipsam nesciunt, delectus eaque consectetur',
    },
    {
      id: 4,
      alt: 'Premios',
      url: require('../../pages/about/images/gallery/img4.jpg').default,
      title: 'Premio a la juventud',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates accusantium velit id consequuntur dolor quas ea eum, sapiente quaerat vel ipsam nesciunt, delectus eaque consectetur',
    },
    {
      id: 5,
      alt: 'Premios',
      url: require('../../pages/about/images/gallery/img5.jpg').default,
      title: 'Premio a la juventud',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates accusantium velit id consequuntur dolor quas ea eum, sapiente quaerat vel ipsam nesciunt, delectus eaque consectetur',
    },
    {
      id: 6,
      alt: 'Premios',
      url: require('../../pages/about/images/gallery/img6.jpg').default,
      title: 'Premio a la juventud',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates accusantium velit id consequuntur dolor quas ea eum,sapiente quaerat vel ipsam nesciunt, delectus eaque consectetur',
    },
    {
      id: 7,
      alt: 'Premios',
      url: require('../../pages/about/images/gallery/img7.jpg').default,
      title: 'Premio a la juventud',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates accusantium velit id consequuntur dolor quas ea eum, sapiente quaerat vel ipsam nesciunt, delectus eaque consectetur',
    },
    {
      id: 8,
      alt: 'Premios',
      url: require('../../pages/about/images/gallery/img8.jpg').default,
      title: 'Premio a la juventud',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates accusantium velit id consequuntur dolor quas ea eum, sapiente quaerat vel ipsam nesciunt, delectus eaque consectetur',
    },
  ],
};

const awardsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default awardsReducer;
