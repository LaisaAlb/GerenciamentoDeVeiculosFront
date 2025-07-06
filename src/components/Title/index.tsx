import './title.css';

export default function Title() {
  const name = localStorage.getItem('userName');

  return (
    <div className="title">
      <h1>Olá, {name}</h1>
      <p>Cadastre e gerencie seus veículos</p>
    </div>
  );
}
