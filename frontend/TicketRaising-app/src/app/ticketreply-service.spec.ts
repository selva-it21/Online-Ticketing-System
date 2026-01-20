import { TestBed } from '@angular/core/testing';
import { TicketReplyService } from './ticketreply-service';

describe('TicketReplyService', () => {
  let service: TicketReplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketReplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
