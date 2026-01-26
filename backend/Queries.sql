-- ============================================
-- TICKET RAISING SYSTEM - SAMPLE DATA INSERTION
-- Execute in THIS ORDER to avoid foreign key violations
-- ============================================

-- 1. DEPARTMENT TABLE (No dependencies)
INSERT INTO Department (DeptId, DeptName, Description) VALUES
('D001', 'IT Department', 'Handles all IT-related issues and support'),
('D002', 'HR Department', 'Human Resources and employee relations'),
('D003', 'Finance Department', 'Financial operations and accounting'),
('D004', 'Operations Department', 'Day-to-day business operations'),
('D005', 'Sales Department', 'Sales and customer relations');
GO

-- 2. SLA TABLE (No dependencies)
INSERT INTO SLA (SLAId, SLAName, Priority, ResponseTime, ResolutionHours) VALUES
('S001', 'Critical Issue SLA', 'Critical', 1, 4),
('S002', 'High Priority SLA', 'High', 2, 8),
('S003', 'Medium Priority SLA', 'Medium', 4, 24),
('S004', 'Low Priority SLA', 'Low', 8, 48),
('S005', 'General Query SLA', 'Normal', 24, 72);
GO

-- 3. TICKETTYPE TABLE (Depends on Department and SLA)
INSERT INTO TicketTypes (TicketTypeId, TypeName, Description, SLAId, DeptId) VALUES
('TT01', 'Hardware Issue', 'Computer, printer, scanner issues', 'S002', 'D001'),
('TT02', 'Software Issue', 'Application, OS, license issues', 'S003', 'D001'),
('TT03', 'Leave Request', 'Employee leave applications', 'S004', 'D002'),
('TT04', 'Salary Query', 'Salary, bonus, deduction queries', 'S003', 'D003'),
('TT05', 'System Access', 'New user access requests', 'S002', 'D001');
GO

-- 4. EMPLOYEE TABLE (Depends on Department)
INSERT INTO Employee (EmpId, EmpName, Password, Role, DeptId) VALUES
('E001', 'John Smith', 'pass123', 'Admin', 'D001'),
('E002', 'Sarah Johnson', 'pass123', 'Manager', 'D002'),
('E003', 'Mike Wilson', 'pass123', 'Support', 'D001'),
('E004', 'Emily Brown', 'pass123', 'HR Executive', 'D002'),
('E005', 'David Lee', 'pass123', 'Finance Officer', 'D003');
GO

-- 5. TICKET TABLE (Depends on TicketType, Employee)
INSERT INTO Ticket (TicketId, Title, Description, TicketTypeId, TicketCreatedDate, Status, CreatedByEmpId, AssignedToEmpId) VALUES
('T001', 'Laptop not starting', 'My laptop shows blue screen on startup', 'TT01', '2024-01-15 09:30:00', 'Open', 'E002', 'E003'),
('T002', 'Software installation needed', 'Need Photoshop installed on my system', 'TT02', '2024-01-15 10:15:00', 'In Progress', 'E004', 'E001'),
('T003', 'Annual leave request', 'Request for 5 days annual leave', 'TT03', '2024-01-16 11:00:00', 'Closed', 'E003', 'E004'),
('T004', 'Salary discrepancy', 'January salary shows wrong deductions', 'TT04', '2024-01-16 14:20:00', 'Open', 'E001', 'E005'),
('T005', 'New email account', 'Need email for new team member', 'TT05', '2024-01-17 08:45:00', 'Closed', 'E005', 'E001');
GO

-- 6. TICKETREPLY TABLE (Depends on Ticket, Employee)
INSERT INTO TicketReply (ReplyId, TicketId, ReplyMessage, ReplyByCreatorEmpId, ReplyByAssignedEmpId) VALUES
('TR0001', 'T001', 'Please restart the laptop in safe mode', 'E002', 'E003'),
('TR0002', 'T001', 'Tried safe mode, still same issue', 'E003', NULL),
('TR0003', 'T002', 'Adobe license approved, will install today', NULL, 'E001'),
('TR0004', 'T003', 'Leave approved from 20th to 24th Jan', NULL, 'E004'),
('TR0005', 'T005', 'Email created and credentials shared', NULL, 'E001');
GO

-- ============================================
-- VERIFICATION QUERIES (Optional)
-- ============================================
