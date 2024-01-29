import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Tema from '../../../models/Tema';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';

function FormularioTema() {
  const [tema, setTema] = useState<Tema>({} as Tema);
  // Variavel de Estado de Carregamento - usada para indicar que está havendo alguma requisição ao Back
  const [isLoading, setIsLoading] = useState<boolean>(false)

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    await buscar(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value
    })

    console.log(JSON.stringify(tema))
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)  // Muda o estado para verdadeiro, indicando que existe uma requisição sendo processada no back

    if (id !== undefined) {
      try {
        await atualizar(`/temas`, tema, setTema, {
          headers: {
            'Authorization': token
          }
        })

        alert('Tema atualizado com sucesso')
        retornar()

      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao atualizar o Tema')
        }

      }

    } else {
      try {
        await cadastrar(`/temas`, tema, setTema, {
          headers: {
            'Authorization': token
          }
        })

        alert('Tema cadastrado com sucesso')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao cadastrado o Tema')
        }
      }
    }
    setIsLoading(false) // Muda o estado para falso, indicando a requisição já terminou de ser processada
    retornar()
  }

  function retornar() {
    navigate("/temas")
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/login');
    }
  }, [token]);

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? 'Cadastre um novo tema' : 'Editar tema'}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do tema</label>
          <input
            type="text"
            placeholder="Descrição"
            name='descricao'
            className="border-2 border-slate-700 rounded p-2"
            value={tema.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
          className="rounded text-slate-100 bg-pink-200 hover:bg-pink-400 w-1/2 py-2 mx-auto flex justify-center "
          type="submit"
        >
          {isLoading ?
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            /> :
            <span>Confirmar</span>
          }
        </button>
      </form>
    </div>
  );
}

export default FormularioTema;