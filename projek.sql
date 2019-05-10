use gym;
select * from users;
delete from users where user_name = 'coba 35';
insert into users (user_name, nama_lengkap, password, email, phone) value ('andi', 'abdil andi', 12, 'andi@gmail.com', 1234567890 );
select * from users where user_name = 'coba 35';
select * from users where user_name = 'ani' and password = '12';
update users set verived = 1 where user_name = 'andi';

select * from products;
select * from products where id =1;
insert into products (id,nama_produk, harga, discount, category,deskripsi) value ('b12','celana joger', 20000, 12, 'bekas','bekasorang' );
delete from products where id = 2;
update products set id_produk = '2b',nama_produk='kain',harga = 20000, discount = 222, id_category= 11, deskripsi='bekas mandi' where id = 2;

select * from products p join categorys c on id_category = c.id;
select p.id, p.nama_produk, p.harga, p.discount, c.category, p.img, p.deskripsi from products p join categorys c on id_category = c.id;

select * from categorys;
insert into categorys (category) value ('minum apa aja');
delete from categorys where id = 4;
update categorys set category ='apa' where id = '5';

select * from cart;


select cart.id,qty, id_produk_cart ,user_name_cart, p.nama_produk, p.harga, p.discount from cart
join products p on id_produk_cart = p.id ;

update cart set qty=1 where id = 1;
delete from cart where id = 3;





