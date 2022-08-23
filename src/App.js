import {Routes, Route, Link} from 'react-router-dom'; 
import Markets from './components/Markets';
import Assets from './components/Assets';

export function App(){
  return(
    <div>
      <Link to="assets">go to assets</Link> | <Link to="markets">go to markets</Link>
      <Routes>
      <Route path='/markets' element={<Markets />} />
      <Route path='/' element={<Assets />} />
      <Route path='/assets' element ={<Assets />} />
      <Route path='*' element={<Assets />} />
      </Routes>
    </div>
  )
}