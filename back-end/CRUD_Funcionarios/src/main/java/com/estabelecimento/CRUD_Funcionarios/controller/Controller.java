package com.estabelecimento.CRUD_Funcionarios.controller;

import com.estabelecimento.CRUD_Funcionarios.model.Funcionario;
import com.estabelecimento.CRUD_Funcionarios.services.FuncionarioServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("func")
public class Controller {

    @Autowired
    private FuncionarioServices funcionarioServices;

    @GetMapping
    public List<Funcionario> getFuncionarios(){
        return funcionarioServices.ListFuncionarios();
    }

    @GetMapping("/ping")
    public String ping(){
        return "pong";
    }

    @GetMapping("/consulta/{cpf}")
    public Funcionario getFuncionario(@PathVariable Long cpf){
        return funcionarioServices.FindFuncionarioById(cpf);
    }

    @PostMapping
    public Funcionario createFuncionario(@RequestBody Funcionario funcionario){
        return funcionarioServices.SaveFuncionario(funcionario);
    }
    @PutMapping
    public Funcionario updateFuncionario(@RequestBody Funcionario funcionario){
        return funcionarioServices.UpdateFuncionario(funcionario);
    }
    @DeleteMapping("/{cpf}")
    public void deleteFuncionario(@PathVariable Long cpf){
        funcionarioServices.DeleteFuncionario(cpf);
    }
}
