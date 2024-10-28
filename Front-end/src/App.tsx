import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Zone from './templates/ZoneTemplate';
import Zones from './pages/Zones';
import ExhibitionLayout from './layouts/ExhibitionLayout';
import ZoneLayout from './layouts/ZoneLayout';
import { basicMenu, advancedMenu } from './data/menus';
import { zones } from './data/zones';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<AdminLayout menuItems={basicMenu} />}>
          <Route path="home" element={<Home />} />
          <Route path="ajustes" element={<Settings />} />
        </Route>

        <Route element={<AdminLayout menuItems={advancedMenu} />}>
          <Route path="zonas" element={<Zones />} />
          {zones.map((zone) => (
            <Route key={zone.id} path={zone.text.toLowerCase()}>
              <Route
                index
                element={
                  <ZoneLayout title={zone.text} primaryColor={zone.color}>
                    <Zone
                      title={zone.text}
                      photo={zone.image}
                      message={`Bienvenido a la zona ${zone.text}.`}
                      description={`Descripción detallada de la zona ${zone.text}.`}
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
