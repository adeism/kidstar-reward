function App() {
  const [stars, setStars] = React.useState(0);
  const [history, setHistory] = React.useState([]);
  const [childName, setChildName] = React.useState('');
  const [inputName, setInputName] = React.useState('');
  const [customReason, setCustomReason] = React.useState('');
  const [customStars, setCustomStars] = React.useState(1);
  const [goodDeeds, setGoodDeeds] = React.useState([
    { deed: 'Membantu orang tua', stars: 1 },
    { deed: 'Mengerjakan PR', stars: 1 },
    { deed: 'Bersikap sopan', stars: 1 }
  ]);
  const [badDeeds, setBadDeeds] = React.useState([
    { deed: 'Tidak patuh', stars: 1 },
    { deed: 'Berkelahi', stars: 1 },
    { deed: 'Berbohong', stars: 1 }
  ]);
  const [newDeed, setNewDeed] = React.useState('');
  const [newDeedStars, setNewDeedStars] = React.useState(1);
  const [deedType, setDeedType] = React.useState('good');
  const [darkMode, setDarkMode] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [activeModal, setActiveModal] = React.useState(null);

  // Improved event handlers
  const handleInputNameChange = (e) => {
    setInputName(e.target.value);
  };

  const handleCustomReasonChange = (e) => {
    setCustomReason(e.target.value);
  };

  const handleNewDeedChange = (e) => {
    setNewDeed(e.target.value);
  };

  const handleCustomStarsChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setCustomStars(value);
  };

  const handleNewDeedStarsChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setNewDeedStars(value);
  };

  const addStar = (reason, amount) => {
    setStars(prev => prev + amount);
    setHistory(prev => [...prev, {
      type: 'add',
      reason: reason,
      date: new Date().toLocaleString(),
      stars: amount
    }]);
  };

  const removeStar = (reason, amount) => {
    if (stars >= amount) {
      setStars(prev => prev - amount);
      setHistory(prev => [...prev, {
        type: 'remove',
        reason: reason,
        date: new Date().toLocaleString(),
        stars: -amount
      }]);
    }
  };

  const handleSetName = (e) => {
    e.preventDefault();
    if (inputName.trim()) {
      setChildName(inputName);
      setInputName('');
      setActiveModal(null);
    }
  };

  const handleAddCustomDeed = (e) => {
    e.preventDefault();
    if (newDeed.trim() && newDeedStars > 0) {
      const newDeedObject = {
        deed: newDeed,
        stars: newDeedStars
      };

      if (deedType === 'good') {
        setGoodDeeds(prev => [...prev, newDeedObject]);
      } else {
        setBadDeeds(prev => [...prev, newDeedObject]);
      }
      setNewDeed('');
      setNewDeedStars(1);
      setActiveModal(null);
    }
  };

  const handleCustomAction = (isPositive) => {
    if (customReason.trim() && customStars > 0) {
      if (isPositive) {
        addStar(customReason, customStars);
      } else {
        removeStar(customReason, customStars);
      }
      setCustomReason('');
      setCustomStars(1);
      setActiveModal(null);
    }
  };

  const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-xl max-w-md w-full mx-4`}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      <div className="p-6 max-w-3xl mx-auto">
        {/* Header and Settings Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {childName ? `Bintang ${childName}` : 'Sistem Bintang'}
          </h2>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            ⚙️
          </button>
        </div>

        {/* Settings Dropdown */}
        {showSettings && (
          <div className={`mb-4 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="space-y-2">
              <button
                onClick={() => setActiveModal('name')}
                className={`w-full text-left p-2 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                Set Nama
              </button>
              <button
                onClick={() => setActiveModal('custom')}
                className={`w-full text-left p-2 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                Aksi Custom
              </button>
              <button
                onClick={() => setActiveModal('newDeed')}
                className={`w-full text-left p-2 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                Tambah Perilaku Baru
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-full text-left p-2 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                Mode {darkMode ? 'Terang' : 'Gelap'}
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        {activeModal === 'name' && (
          <Modal onClose={() => setActiveModal(null)}>
            <form onSubmit={handleSetName}>
              <h3 className="font-bold mb-4">Set Nama Anak</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={inputName}
                  onChange={handleInputNameChange}
                  placeholder="Masukkan nama anak"
                  className={`w-full border p-2 rounded ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-black'
                  }`}
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Simpan
                </button>
              </div>
            </form>
          </Modal>
        )}

        {activeModal === 'custom' && (
          <Modal onClose={() => setActiveModal(null)}>
            <h3 className="font-bold mb-4">Aksi Custom</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={customReason}
                onChange={handleCustomReasonChange}
                placeholder="Alasan"
                className={`w-full border p-2 rounded ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-black'
                }`}
              />
              <input
                type="number"
                value={customStars}
                onChange={handleCustomStarsChange}
                min="1"
                className={`w-full border p-2 rounded ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-black'
                }`}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleCustomAction(true)}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Tambah
                </button>
                <button
                  onClick={() => handleCustomAction(false)}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Kurang
                </button>
              </div>
            </div>
          </Modal>
        )}

        {activeModal === 'newDeed' && (
          <Modal onClose={() => setActiveModal(null)}>
            <form onSubmit={handleAddCustomDeed}>
              <h3 className="font-bold mb-4">Tambah Perilaku Baru</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newDeed}
                  onChange={handleNewDeedChange}
                  placeholder="Perilaku baru"
                  className={`w-full border p-2 rounded ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-black'
                  }`}
                />
                <input
                  type="number"
                  value={newDeedStars}
                  onChange={handleNewDeedStarsChange}
                  min="1"
                  placeholder="Jumlah bintang"
                  className={`w-full border p-2 rounded ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-black'
                  }`}
                />
                <select
                  value={deedType}
                  onChange={(e) => setDeedType(e.target.value)}
                  className={`w-full border p-2 rounded ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-black'
                  }`}
                >
                  <option value="good">Perilaku Baik</option>
                  <option value="bad">Perilaku Buruk</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Tambah
                </button>
              </div>
            </form>
          </Modal>
        )}

        {/* Stars Display */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">
            {[...Array(stars)].map((_, index) => (
              <span key={index} className="text-yellow-400">★</span>
            ))}
          </div>
          <p className="text-xl font-bold">Total Bintang: {stars}</p>
        </div>

        {/* Deeds Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-bold mb-2">Perilaku Baik</h3>
            {goodDeeds.map((item, index) => (
              <button
                key={index}
                onClick={() => addStar(item.deed, item.stars)}
                className="w-full mb-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                {item.deed} ({item.stars} ★)
              </button>
            ))}
          </div>

          <div>
            <h3 className="font-bold mb-2">Perilaku Buruk</h3>
            {badDeeds.map((item, index) => (
              <button
                key={index}
                onClick={() => removeStar(item.deed, item.stars)}
                className="w-full mb-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                {item.deed} ({item.stars} ★)
              </button>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="mt-6">
          <h3 className="font-bold mb-2">Riwayat Aktivitas:</h3>
          <div className={`max-h-40 overflow-y-auto ${darkMode ? 'text-white' : 'text-black'}`}>
            {history.map((item, index) => (
              <div
                key={index}
                className={`p-2 mb-2 rounded ${
                  darkMode
                    ? item.type === 'add'
                      ? 'bg-green-900'
                      : 'bg-red-900'
                    : item.type === 'add'
                    ? 'bg-green-100'
                    : 'bg-red-100'
                }`}
              >
                <p>
                  {item.date}: {item.type === 'add' ? 'Mendapat' : 'Kehilangan'} {Math.abs(item.stars)} bintang - {item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
