export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-gray-600 font-medium mb-2">
            © {currentYear} Quiz Constructor - Tous droits réservés
          </p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>
              <span className="font-semibold">Chef de projet :</span> Eltigani Abdallah
            </p>
            <p>
              <span className="font-semibold">Collaborateur :</span> Laurent Cassar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
