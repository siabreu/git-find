import { useState } from 'react';
import { Header } from '../../components/Header';
import background from '../../assets/background.png';
import ItemList from '../../components/ItemList';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './styles.css';

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const apiGithubUrl = "https://api.github.com/users/";
    const userData = await fetch(`${apiGithubUrl}${user}`)
    const newUser = await userData.json();

    if (newUser.login) {
      const { login, avatar_url, name, bio } = newUser;
      setCurrentUser({ login, avatar_url, name, bio });

      const reposData = await fetch(`${apiGithubUrl}${user}/repos`)
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background app" />
        <div className="info">
          <div>
            <Input
              value={user}
              onChange={event => setUser(event.target.value)}
            />
            <Button label="Buscar" onClick={handleGetData} />
          </div>
          {currentUser?.login ? (
            <>
              <div className="perfil">
                <img src={currentUser.avatar_url}
                  className="profile-img"
                  alt="imagem de perfil"/>
                <div>
                  <h3>{currentUser.name ? currentUser.name : currentUser.login}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null }

          {repos?.length ? (
            <div>
              <h4 className="repositorio">Repositórios</h4>
              {repos.map(repo => (
                <ItemList title={repo.name} description={repo.description}/>
              ))}
            </div>
          ) : null }
        </div>
      </div>
    </div>
  );
}

export default App;
