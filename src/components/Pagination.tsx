type Props = {
  totalPages: number;
  currentPage: number;
  totalItems: number;
  offset: number;
  limit: number;
  setPage: (page: number) => void;
}

export const Pagination = ({ totalPages, currentPage, setPage, totalItems, offset, limit }: Props) => {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button 
          className={`${currentPage === 1 ? 'pointer-events-none' : ''}  relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
          onClick={() => setPage(currentPage - 1)}
        > 
          Anterior
        </button>
        <button 
          className={`${currentPage === totalPages ? 'pointer-events-none' : ''} relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
          onClick={() => setPage(currentPage + 1)}
        > 
          Siguiente
        </button>
      </div>

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700 gap-2">
          Mostrando 
          <span className="font-medium"> {offset + 1}</span> a 
          <span className="font-medium"> {offset + limit > totalItems ? totalItems : offset + limit} de
          </span>
          <span className="font-medium"> {totalItems} resultados</span>
        </p>
      </div>
      <div className="hidden sm:block">
        <nav className="relative z-0 inline-flex rounded-md shadow-md">
          {
            [...Array(totalPages)].map((_, index) => (
              <button 
                key={index} 
                onClick={() => setPage(index + 1)}
                className={`${currentPage === index + 1 ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
              >
                {index + 1}
              </button>
            ))
          }
        </nav>
      </div>
    </div>
  )
}
