var Data = [
    {
        id: 1,
        title: 'Yellow Pail',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        url: '#',
        votes: generateVoteCount(),
        submitter_avatar_url: 'images/avatars/avatar.png',
        product_image_url: 'images/products/default.png'
    },
    {
        id: 2,
        title: 'Yellow Pail',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        url: '#',
        votes: generateVoteCount(),
        submitter_avatar_url: 'images/avatars/avatar.png',
        product_image_url: 'images/products/default.png'
    },
    {
        id: 3,
        title: 'Yellow Pail',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        url: '#',
        votes: generateVoteCount(),
        submitter_avatar_url: 'images/avatars/avatar.png',
        product_image_url: 'images/products/default.png'
    },
    {
        id: 4,
        title: 'Yellow Pail',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        url: '#',
        votes: generateVoteCount(),
        submitter_avatar_url: 'images/avatars/avatar.png',
        product_image_url: 'images/products/default.png'
    }
];

function generateVoteCount() {
    return 3;
}

console.log(Data,'data loaded');