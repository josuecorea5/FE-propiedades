export const ContactForm = () => {
  return (
    <form>
      <div className="space-y-2">
        <p className="text-2xl text-center">Contacta al vendedor</p>
        <label htmlFor="message">Mensaje</label>
        <textarea name="message" id="message" className="w-full py-2 px-1 border border-gray-300 rounded-lg shadow placeholder-gray-400" placeholder="Escribe tu mensaje"></textarea>
        <button className="bg-indigo-600 text-white font-bold text-sm w-full p-2 cursor-pointer">Enviar mensaje</button>
      </div>
    </form>
  )
}