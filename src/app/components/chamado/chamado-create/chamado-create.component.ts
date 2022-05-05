import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from './../../../services/tecnico.service';
import { ClienteService } from './../../../services/cliente.service';
import { Tecnico } from './../../../models/tecnicos';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/clientes';
import { ChamadoService } from 'src/app/services/chamado.service';
import { Chamado } from 'src/app/models/chamado';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.scss'],
})
export class ChamadoCreateComponent implements OnInit {
  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];
  chamados: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacao: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  };

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  observacao: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private chamadoService: ChamadoService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnico();
  }

  findAllClientes(): void {
    this.clienteService.findall().subscribe((resposta) => {
      this.clientes = resposta;
    });
  }
  findAllTecnico(): void {
    this.tecnicoService.findall().subscribe((resposta) => {
      this.tecnicos = resposta;
    });
  }

  create(): void {
    this.chamadoService.create(this.chamados).subscribe(
      (resposta) => {
        this.toast.success('Chamado criado com sucesso', 'Novo Chamado');
        this.router.navigate(['chamados']);
      },
      (ex) => {
        this.toast.error(ex.error.error);
      }
    );
  }

  validaCampos(): boolean {
    return (
      this.prioridade.valid &&
      this.status.valid &&
      this.titulo.valid &&
      this.observacao.valid &&
      this.tecnico.valid &&
      this.cliente.valid
    );
  }
}
