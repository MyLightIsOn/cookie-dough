import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';

import { CompanyService} from './companies/company.service';
import { environment} from '../environments/environment';
import {XHRBackend, Response, ResponseOptions } from '@angular/http';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'companyObject'
})
export class MockPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value;
    }
}


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, MockPipe ],
        imports: [ RouterTestingModule, HttpClientTestingModule ],
        providers: [ CompanyService, MockPipe,
            { provide: environment.apiUrl, useValue: 'http://example.com'},
            { provide: XHRBackend, useClass: MockBackend}
        ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should return an Observable using a pipe', inject([CompanyService, XHRBackend, MockPipe], (companySerivce, mockBackend) => {
      const mockResponse = {
          data: [
              { id: 0, name: 'Company 1' },
              { id: 1, name: 'Company 2' },
              { id: 2, name: 'Company 3' },
              { id: 3, name: 'Company 4' },
          ]
      };

      mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(mockResponse)
          })));
      });

      companySerivce.getAllCompanies().subscribe((company) => {
          expect(company.length).toBe(4);
          expect(company[0].name).toEqual('Company 1');
          expect(company[1].name).toEqual('Company 2');
          expect(company[2].name).toEqual('Company 3');
          expect(company[3].name).toEqual('Company 4');
      });
  }));
});

