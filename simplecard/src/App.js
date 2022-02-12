import './App.css';
import Card from './component/card/Card';

function App() {
  const data = [{ imgUrl: 'https://randomuser.me/api/portraits/men/53.jpg', title: 'jordan peterson', description: 'Famous writer is me. I am a famous writer' },
  { imgUrl: 'https://randomuser.me/api/portraits/men/27.jpg', title: 'patrick bet david', description: 'I am an alpha male. Alpha male is me.' }]
  return (
    <div className="App">
      <header className="App-header">
        {data.map(item => <Card key={item.title} data={item} />)}
      </header>
    </div>
  );
}

export default App;
