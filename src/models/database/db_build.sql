
DROP SCHEMA IF EXISTS hotel CASCADE;
CREATE SCHEMA hotel;

COMMENT ON SCHEMA hotel IS 'Schema for hotel services web app';

CREATE DOMAIN TAXCODE VARCHAR(100) NOT NULL;
CREATE DOMAIN PHONE_NUMBER VARCHAR(20);
CREATE DOMAIN POSITIVE_INT INTEGER CHECK ((VALUE IS NULL) OR (VALUE >= 0));
CREATE TYPE RESERVATION_STATE AS ENUM ('reqested', 'processing', 'successful', 'rejected');
CREATE TYPE ORDER_STATE AS ENUM ('reqested', 'received', 'paid', 'cancelled');
 
CREATE TABLE hotel.role(
	name VARCHAR(100) PRIMARY KEY,
	description VARCHAR(500)
);

COMMENT ON TABLE hotel.role IS 'Represents the employees roles in the hotel';
COMMENT ON COLUMN hotel.role.name IS 'The unique name of a role';
COMMENT ON COLUMN hotel.role.description IS 'Details about the responsibilities of each role';

CREATE TABLE hotel.working_schedule(
	type VARCHAR(100) PRIMARY KEY,
	description VARCHAR(500)
);

COMMENT ON TABLE hotel.working_schedule IS 'Represents the working type for each employee';
COMMENT ON COLUMN hotel.working_schedule.type IS 'the working type such as Full-time, Part-time';
COMMENT ON COLUMN hotel.working_schedule.description IS 'Notes about the working type and hour';

CREATE TABLE hotel.department(
	id SERIAL PRIMARY KEY,
	name VARCHAR(300),
	manager_id TAXCODE
);

COMMENT ON TABLE hotel.department IS 'Represents the departments in the hotel';
COMMENT ON COLUMN hotel.department.id IS 'the serial id of each department';
COMMENT ON COLUMN hotel.department.name IS 'the name of the department in the hotel';
COMMENT ON COLUMN hotel.department.manager_id IS 'the tax_code of the managed employee';

CREATE TABLE hotel.employee(
	tax_code TAXCODE PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	surname VARCHAR(100) NOT NULL,
	work_type VARCHAR(100) NOT NULL REFERENCES hotel.working_schedule(type),
	department_name INTEGER REFERENCES hotel.department(id),
	phone_number PHONE_NUMBER,
	salary POSITIVE_INT,
	bank_name VARCHAR(200),
	bank_full_name VARCHAR(500),
	account_number VARCHAR(200),
	role VARCHAR(100) REFERENCES hotel.role(name)
);

ALTER TABLE hotel.department ADD FOREIGN KEY (manager_id) REFERENCES hotel.employee(tax_code);

COMMENT ON TABLE hotel.employee IS 'Represents an employee.';
COMMENT ON COLUMN hotel.employee.tax_code IS 'The unique tax code of the employee.';
COMMENT ON COLUMN hotel.employee.name IS 'The name of the employee.';
COMMENT ON COLUMN hotel.employee.surname IS 'The surname of the employee.';
COMMENT ON COLUMN hotel.employee.work_type IS 'The working type of the employee.';
COMMENT ON COLUMN hotel.employee.department_name IS 'The department name that the employee work in.';
COMMENT ON COLUMN hotel.employee.phone_number IS 'The phone number of the employee.';
COMMENT ON COLUMN hotel.employee.salary IS 'The salary of the employee.';
COMMENT ON COLUMN hotel.employee.bank_name IS 'The bank name of the employee account number.';
COMMENT ON COLUMN hotel.employee.bank_full_name IS 'The full name of the employee in the bank.';
COMMENT ON COLUMN hotel.employee.account_number IS 'The account number of the employee.';
COMMENT ON COLUMN hotel.employee.role IS 'The role of the employee.';

CREATE TABLE hotel.request(
	id SERIAL PRIMARY KEY,
	state VARCHAR(100),
	"to" INTEGER REFERENCES hotel.department(id),
	issued_by TAXCODE REFERENCES hotel.employee(tax_code),
	handled_by TAXCODE REFERENCES hotel.employee(tax_code),
	priority SMALLINT NOT NULL CHECK (priority >= 0),
	issued_at TIMESTAMP NOT NULL DEFAULT NOW(),
	handled_at TIMESTAMP DEFAULT NULL
);

COMMENT ON TABLE hotel.request IS 'Represents a request between departments.';
COMMENT ON COLUMN hotel.request.id IS 'the serial id of a request';
COMMENT ON COLUMN hotel.request.state IS 'The state of the given request made by the staff member (such as pending, finished).';
COMMENT ON COLUMN hotel.request.to IS 'The department to which the request is sent to.';
COMMENT ON COLUMN hotel.request.issued_by IS 'Tax-code of the client making the request';
COMMENT ON COLUMN hotel.request.handled_by IS 'Tax-code of the employee who handled the request.';
COMMENT ON COLUMN hotel.request.priority IS 'the priority assigned for a given request, whether it is high, normal, or low.';
COMMENT ON COLUMN hotel.request.issued_at IS 'The date at which the request was issued';
COMMENT ON COLUMN hotel.request.handled_at IS 'The date at which the request was handeled';

CREATE TABLE hotel.expense_invoice(
	id SERIAL PRIMARY KEY,
	made_by TAXCODE NOT NULL REFERENCES hotel.employee(tax_code),
	"to" VARCHAR(500) NOT NULL,
	type VARCHAR(100),
	made_at TIMESTAMP NOT NULL DEFAULT NOW(),
	amount NUMERIC(8, 4) NOT NULL
);

COMMENT ON TABLE hotel.expense_invoice IS 'Represents an invoice to be processed by the operation manager for payment';
COMMENT ON COLUMN hotel.expense_invoice.id IS 'the serial id of an invoice';
COMMENT ON COLUMN hotel.expense_invoice.made_by IS 'Tax-code for the employee making the invoice.';
COMMENT ON COLUMN hotel.expense_invoice.to IS 'The receiving party that the payment is handed to.';
COMMENT ON COLUMN hotel.expense_invoice.type IS 'The type of expenses covered in a given invoice such labelling it for salaries or taxes etc.';
COMMENT ON COLUMN hotel.expense_invoice.made_at IS 'The date at which the invoice was made.';
COMMENT ON COLUMN hotel.expense_invoice.amount IS 'The payment amount';

CREATE TABLE hotel.client(
	tax_code TAXCODE PRIMARY KEY,
	name VARCHAR(200) NOT NULL, -- including surname
	email VARCHAR(400) NOT NULL,
	phone_number PHONE_NUMBER NOT NULL,
	address_zip VARCHAR(10),
	address_street VARCHAR(200),
	address_number VARCHAR(20)
);

COMMENT ON TABLE hotel.client IS 'Represents a hotel client.';
COMMENT ON COLUMN hotel.client.tax_code IS 'the tax code of a client';
COMMENT ON COLUMN hotel.client.name IS 'the name of a client';
COMMENT ON COLUMN hotel.client.email IS 'the email of a client';
COMMENT ON COLUMN hotel.client.phone_number IS 'the phone number for a client';
COMMENT ON COLUMN hotel.client.address_zip IS 'the zip address for a client';
COMMENT ON COLUMN hotel.client.address_street IS 'the street address for a client';
COMMENT ON COLUMN hotel.client.address_number IS 'the street address number for a client';


CREATE TABLE hotel.reservation(
	id SERIAL PRIMARY KEY,
	client_id TAXCODE REFERENCES hotel.client(tax_code),
	state RESERVATION_STATE,
	created_at TIMESTAMP DEFAULT NOW(),
	notes VARCHAR(1000),
	rate POSITIVE_INT,
	feedback VARCHAR(2000),
	approved_by TAXCODE REFERENCES hotel.employee(tax_code),
	amount NUMERIC(8, 4)
);

COMMENT ON TABLE hotel.reservation IS 'Represents a hotel reservation.';
COMMENT ON COLUMN hotel.reservation.id IS 'the serial id of a reservation.';
COMMENT ON COLUMN hotel.reservation.client_id IS 'Tax-code for the client who make the reservation.';
COMMENT ON COLUMN hotel.reservation.state IS 'the state of a reservation.';
COMMENT ON COLUMN hotel.reservation.created_at IS 'The date at which the reservation was made.';
COMMENT ON COLUMN hotel.reservation.notes IS 'Additional notes added for a reservation, it can also has the visitor name in case he is not a registered client.';
COMMENT ON COLUMN hotel.reservation.rate IS 'The rate of the reservation which accepts a value out of 5.';
COMMENT ON COLUMN hotel.reservation.feedback IS 'The customer feedback about the reservation.';
COMMENT ON COLUMN hotel.reservation.approved_by IS 'The tax code of the employee approving the reservation';
COMMENT ON COLUMN hotel.reservation.amount IS 'The currency amount for the reservation.';

CREATE TABLE hotel.hotel_service(
	id SERIAL PRIMARY KEY,
	"type" VARCHAR(200) NOT NULL,
	capacity POSITIVE_INT,
	price NUMERIC(8, 4) NOT NULL
);

COMMENT ON TABLE hotel.hotel_service IS 'Represents a hotel service.';
COMMENT ON COLUMN hotel.hotel_service.id IS 'the serial id of a hotel service.';
COMMENT ON COLUMN hotel.hotel_service.type IS 'The hotel service type.';
COMMENT ON COLUMN hotel.hotel_service.capacity IS 'The amount of personnel allowed for a hotel service.';
COMMENT ON COLUMN hotel.hotel_service.price IS 'the price of a hotel service.';

CREATE TABLE hotel.availability_period(
	id SERIAL PRIMARY KEY,
	duration tstzrange,
	notes TEXT,
	reservation_id INTEGER REFERENCES hotel.reservation(id),
	service_id INTEGER NOT NULL REFERENCES hotel.hotel_service(id)
);

COMMENT ON TABLE hotel.availability_period IS 'Represents an availability time slot.';
COMMENT ON COLUMN hotel.availability_period.duration IS 'Represents an availability duration.';
COMMENT ON COLUMN hotel.availability_period.id IS 'the serial id of a time slot.';
COMMENT ON COLUMN hotel.availability_period.notes IS 'Optional notes for some hotel services.';
COMMENT ON COLUMN hotel.availability_period.reservation_id IS 'The id of a reservation made by a client.';
COMMENT ON COLUMN hotel.availability_period.service_id IS 'The id of a service requested by a client.';

CREATE TABLE hotel.order(
	id SERIAL PRIMARY KEY,
	reservation_id INTEGER REFERENCES hotel.reservation(id),
	service_id INTEGER REFERENCES hotel.hotel_service(id),
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	state ORDER_STATE
);

COMMENT ON TABLE hotel.order IS 'Represents an order for hotel services.';
COMMENT ON COLUMN hotel.order.id IS 'the serial id of an order.';
COMMENT ON COLUMN hotel.order.reservation_id IS 'The id of a reservation made by a client.';
COMMENT ON COLUMN hotel.order.created_at IS 'The date at which the order was made.';
COMMENT ON COLUMN hotel.order.state IS 'the state of the order.';


CREATE TABLE hotel.category(
	id SERIAL PRIMARY KEY,
	name VARCHAR(300) NOT NULL
);
COMMENT ON TABLE hotel.category IS 'Represents a food/drink category of items in the menu.';
COMMENT ON COLUMN hotel.category.id IS 'the serial id of a category.';
COMMENT ON COLUMN hotel.category.name IS 'the name for a category.';

CREATE TABLE hotel.item(
	id SERIAL PRIMARY KEY,
	category_id INTEGER REFERENCES hotel.category(id),
	title VARCHAR(300) NOT NULL,
	price NUMERIC(8, 4) NOT NULL
);

COMMENT ON TABLE hotel.item IS 'Represents an item in the menu.';
COMMENT ON COLUMN hotel.item.id IS 'the serial id of the item in the menu.';
COMMENT ON COLUMN hotel.item.category_id IS 'the id of the related category.';
COMMENT ON COLUMN hotel.item.title IS 'the title of an item.';
COMMENT ON COLUMN hotel.item.price IS 'the price of an item.';


CREATE TABLE hotel.order_item(
	order_id INTEGER NOT NULL REFERENCES hotel.order(id),
	item_id INTEGER NOT NULL REFERENCES hotel.item(id),
	quantity POSITIVE_INT NOT NULL,
	price NUMERIC(8, 4) NOT NULL,
    PRIMARY KEY (order_id,item_id)
);

COMMENT ON TABLE hotel.order_item IS 'Represents an item in the food/drinks order.';
COMMENT ON COLUMN hotel.order_item.order_id IS 'the serial id of an order.';
COMMENT ON COLUMN hotel.order_item.item_id IS 'the serial id of the item in the menu.';
COMMENT ON COLUMN hotel.order_item.quantity IS 'the quentity of the item in the food/drinks order.';
COMMENT ON COLUMN hotel.order_item.price IS 'the price of the item in the food/drinks order.';
