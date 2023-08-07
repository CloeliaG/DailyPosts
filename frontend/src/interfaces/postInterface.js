import userInterface from './userInterface.js'
import commentaireInterface from './commentaireInterface.js'

export default {
    id: -1,
    title: '',
    content: '',
    creator: '',
    likes: 0,
    likedBy: [{ ...userInterface }],
    commentaires: [{ ...commentaireInterface }]
}