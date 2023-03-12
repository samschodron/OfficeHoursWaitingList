export const createWaitingRoom = async (req, res) => {
    try {
        console.log(req.body)
        res.status(200).json({ message: 'waiting room created successfully' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}