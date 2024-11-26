import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useZones } from './hooks/Zones'
import { useMenus } from './hooks/Menu'

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Zones from './pages/Zones';
import Notifications from './pages/Notifications';
import Achievements from './pages/Achievements';
import Publications from './pages/Publications';
import Statistics from './pages/StatisticsTest';
import Users from './pages/Users';
import Content from './pages/Content';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import ExhibitionLayout from './layouts/ExhibitionLayout';
import ZoneLayout from './layouts/ZoneLayout';

// Templates
import ZoneTemplate from './templates/ZoneTemplate';

function App() {
  const { zones, loading, error } = useZones();
  const { basicMenu, advancedMenu } = useMenus();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-lightLime border-opacity-80"></div>
        <h1 className="mt-6 text-xl font-semibold text-gray-700">
          Cargando datos...
        </h1>
        <p className="text-gray-500">Por favor, espera un momento.</p>
      </div>
    );
  }  

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<AdminLayout menuItems={basicMenu} />}>
          <Route path="home" element={<Home />} />

          <Route path="contenido" element={<Content />} />
          <Route path="contenido/zonas" element={<Zones />} />
          <Route path="contenido/publicaciones" element={<Publications />} />
          <Route path="contenido/logros" element={<Achievements />} />
          <Route path="contenido/notificaciones" element={<Notifications />} />
          
          <Route path="estadisticas" element={<Statistics />} />
          <Route path="usuarios" element={<Users />} />
          <Route path="ajustes" element={<Settings />} />
        </Route>

        <Route element={<AdminLayout menuItems={advancedMenu} />}>
          {zones.map((zone) => (
            <Route key={zone.id} path={zone.text.toLowerCase()}>
              <Route
                index
                element={
                  <ZoneLayout title={zone.text} primaryColor={zone.color} id={zone.id}>
                    <ZoneTemplate
                      id = {zone.id}
                      title={zone.text}
                      photo={zone.image}
                      message={zone.mensaje}
                      description={zone.descripcion}
                      primaryColor={zone.color}
                    />
                  </ZoneLayout>
                }
              />

              {zone.subItems?.map((subItem) => (
                <Route
                  key={subItem.name}
                  path={subItem.name.toLowerCase()}
                  element={
                    <ExhibitionLayout
                      title={subItem.name}
                      primaryColor={zone.color}
                      id={subItem.id}
                    />
                  }
                />
              ))}
            </Route>
          ))}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
