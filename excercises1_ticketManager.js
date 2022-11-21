class TicketManager {

    #precioBaseDeGanancia
    constructor (){
        this.events = []
        this.#precioBaseDeGanancia = 0.15
    }

    getEvents = () => {return this.events}
    getNextID = () => {
        const count = this.events.length
        return (count > 0) ? this.events [count-1].id + 1:1
    }

    addEvent = (name, place, price, capacity, date) => {
        const event = {
            name,
            place,
            price: price *(1 + this.#precioBaseDeGanancia),
            capacity: capacity ?? 50,
            date: date ?? new Date().toLocaleDateString()
        }

        this.events.push (event)

    }
}

const ticketManager = new TicketManager()
ticketManager.addEvent ("Bad Bunny", "Medellin", 120, 0, 0)
ticketManager.addEvent ("AC DC", "Miami", 1000, 0, 0)

console.log(ticketManager.getEvents());