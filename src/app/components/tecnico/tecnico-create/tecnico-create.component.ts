import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/models/tecnicos';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.scss']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  }


  nome: FormControl = new FormControl(null, Validators.minLength(3))
  cpf: FormControl = new FormControl(null, Validators.required)
  email: FormControl = new FormControl(null, Validators.email)
  senha: FormControl = new FormControl(null, Validators.minLength(3))

  constructor( private service: TecnicoService,
    private tost: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }



  create():void{
    this.service.create(this.tecnico).subscribe(resposta => {
      this.tost.success('Tecnico cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['tecnicos'])

    }, ex =>{
      if(ex.error.errors){
        ex.error.errors.forEach(element => {
          this.tost.error(element.message)
        });
      }else{
        this.tost.error(ex.error.message)
      }
    })
  }

  addPerfil(perfil: any){

    if (this.tecnico.perfis.includes(perfil)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1)

    }else{
      this.tecnico.perfis.push(perfil)
    }

  }

  validaCampos():boolean{
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }

}
