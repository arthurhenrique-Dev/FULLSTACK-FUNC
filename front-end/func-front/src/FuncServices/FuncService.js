import { useState } from 'react';
import axios from "axios";
const url = "http://localhost:8080/func"

export async function getFuncionarios() {
    const resposta = await axios.get(url)
    return resposta.data
}

export async function postFuncionario(funcionario) {
    const resposta = await axios.post(url, funcionario);
    return resposta.data;
}
export async function deleteFuncionario(cpf) {
    await axios.delete(`${url}/${cpf}`);
}
export async function putFuncionario(id, funcionario) {
  const resposta = await axios.put(`${url}/${id}`, funcionario);
  return resposta.data;
}

