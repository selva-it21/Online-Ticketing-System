-- First, let's create sample data for all related tables
-- Assumed table structures based on your repositories:

-- Departments
INSERT INTO Department (DeptId, DeptName) VALUES
('D001', 'IT Support'),
('D002', 'HR Department'),
('D003', 'Finance'),
('D004', 'Operations');
select * from Department

-- Employees
INSERT INTO Employee (EmpId, EmpName, Password, Role, DeptId) VALUES
('E001', 'John Doe', 'password123', 'Admin', 'D001'),
('E002', 'Jane Smith', 'pass456', 'Manager', 'D001'),
('E003', 'Bob Wilson', 'test789', 'Employee', 'D002'),
('E004', 'Alice Brown', 'demo123', 'Support', 'D001'),
('E005', 'Charlie Davis', 'demo456', 'Employee', 'D003');
select * from Employee
-- Ticket Types
INSERT INTO TicketTypes (TicketTypeId, TypeName) VALUES
('TT01', 'Hardware Issue'),
('TT02', 'Software Issue'),
('TT03', 'Network Problem'),
('TT04', 'Account Access'),
('TT05', 'HR Query');
select * from TicketTypes
-- Tickets
INSERT INTO Ticket (TicketId, Title, Description, CreatedByEmpId, AssignedToEmpId, TicketTypeId, Status) VALUES
('T001', 'Laptop not starting', 'My laptop shows blue screen error', 'E003', 'E004', 'TT01', 'Open'),
('T002', 'Email access issue', 'Cannot access Outlook email', 'E005', 'E001', 'TT04', 'In Progress'),
('T003', 'Software installation', 'Need Photoshop installed', 'E003', 'E002', 'TT02', 'Closed'),
('T004', 'VPN connection problem', 'Cannot connect to company VPN', 'E005', 'E004', 'TT03', 'Open')
select * from ticket
-- Ticket Replies
INSERT INTO TicketReply (ReplyId, TicketId, ReplyMessage, ReplyByCreatorEmpId, ReplyByAssignedEmpId) VALUES
('R001', 'T001', 'Please try restarting your laptop', NULL, 'E004'),
('R002', 'T001', 'Already tried restarting, issue persists', 'E003', NULL),
('R003', 'T002', 'Your account has been reset. Try login now.', NULL, 'E001'),
('R004', 'T003', 'Software installed successfully', NULL, 'E002'),
('R005', 'T004', 'VPN credentials have been updated', NULL, 'E004');
select * from TicketReply

INSERT INTO SLA (SLAId, SLAName, Priority, ResponseTime, ResolutionHours) VALUES
('S001', 'Critical SLA', 'Critical', 1, 4),
('S002', 'High Priority SLA', 'High', 2, 8),
('S003', 'Medium Priority SLA', 'Medium', 4, 24),
('S004', 'Low Priority SLA', 'Low', 8, 48),
('S005', 'Standard SLA', 'Standard', 24, 72)