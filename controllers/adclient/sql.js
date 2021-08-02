module.exports = {
    //增
    add: 'INSERT INTO `good` (`id`,`name`,`desc`,`price`,`sum`) VALUES(0,?,?,?,?)',
    //删
    delete: 'delete from good where id=?',
    //改
    update: 'UPDATE `good` SET `name`=?,`desc`=?,`price`=?,`sum`=? WHERE `id`=?',
    //查
    select: 'select * from advert where id=$1'
}
