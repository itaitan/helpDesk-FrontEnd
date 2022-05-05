import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/clientes';
import { Tecnico } from 'src/app/models/tecnicos';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.scss'],
})
export class ChamadoReadComponent implements OnInit {
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.chamados.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllTecnico();
  }

  findById(): void {
    this.chamadoService.findById(this.chamados.id).subscribe((resposta) => {
      this.chamados = resposta;
    });
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

  statusReturn(status: any): string {
    if (status === 0) {
      return 'Aberto';
    } else if (status === 1) {
      return 'Em andamento';
    } else {
      return 'Encerrado';
    }
  }

  prioridadeReturn(prioridade: any): string {
    if (prioridade === 0) {
      return 'Baixa';
    } else if (prioridade === 1) {
      return 'Média';
    } else {
      return 'Alta';
    }
  }
}
