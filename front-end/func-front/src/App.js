import React, { useEffect, useState } from 'react';
import CadastroFuncionario from './FuncServices/CadastroFuncionario';
import { getFuncionarios, deleteFuncionario } from './FuncServices/FuncService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './estilização/style.css'

export default function App() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionarioEditando, setFuncionarioEditando] = useState(null);
  const [tela, setTela] = useState('lista'); // 'lista' ou 'cadastro'
  const [loadingLista, setLoadingLista] = useState(false);
  const [erroLista, setErroLista] = useState('');

  const carregarFuncionarios = async () => {
    setLoadingLista(true);
    setErroLista('');
    try {
      const dados = await getFuncionarios();
      setFuncionarios(dados);
    } catch {
      setErroLista('Erro ao carregar funcionários.');
    } finally {
      setLoadingLista(false);
    }
  };

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const handleExcluir = async (cpf) => {
    if (window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      try {
        await deleteFuncionario(cpf);
        carregarFuncionarios();
        if (funcionarioEditando && funcionarioEditando.cpf === cpf) {
          setFuncionarioEditando(null);
        }
      } catch {
        alert('Erro ao excluir funcionário.');
      }
    }
  };

  const onFuncionarioCadastradoOuEditado = () => {
    setFuncionarioEditando(null);
    setTela('lista');
    carregarFuncionarios();
  };

  const novoFuncionario = () => {
    setFuncionarioEditando(null);
    setTela('cadastro');
  };

  if (tela === 'cadastro') {
    return (
      <div className="container mt-5">
        <CadastroFuncionario
          funcionario={funcionarioEditando}
          onFuncionarioCadastrado={onFuncionarioCadastradoOuEditado}  
        />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Gerenciar Funcionários</h1>

      <div className="d-flex justify-content-end mb-4 gap-2">
        <button className="btn btn-success" onClick={novoFuncionario}>
          Novo Funcionário
        </button>
      </div>

      {loadingLista && <p>Carregando funcionários...</p>}
      {erroLista && <p className="text-danger">{erroLista}</p>}


      <table className="table table-dark table-striped table-bordered mt-3" style={{ tableLayout: 'auto', width: '100%'}}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>RG</th>
            <th>Idade</th>
            <th>Salário</th>
            <th>Cargo</th>
            <th>Estado Civil</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((func) => (
            <tr key={func.cpf}>
              <td>{func.nome}</td>
              <td>{func.cpf}</td>
              <td>{func.rg}</td>
              <td>{func.idade}</td>
              <td>{func.salario}</td>
              <td>{func.cargo}</td>
              <td>{func.estadocivil}</td>
              <td>
                {func.endereco.rua}, {func.endereco.numero} - {func.endereco.bairro}, {func.endereco.cidade} - {func.endereco.estado}
              </td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setFuncionarioEditando(func);
                      setTela('cadastro');
                    }}
                  >
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => handleExcluir(func.cpf)}>
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        {!loadingLista && funcionarios.length === 0 && <p>Nenhum funcionário cadastrado.</p>}
    </div>
  );
}
