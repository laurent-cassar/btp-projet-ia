export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-gray-600 font-medium mb-2">
            © {currentYear} Quiz Constructor - Tous droits réservés
          </p>
          <p className="text-sm text-gray-500 font-semibold mb-1">Co-développeurs</p>
          <p className="text-sm text-gray-500">Eltigani Abdallah &amp; Laurent Cassar</p>
        </div>
      </div>
    </footer>
  );
};
