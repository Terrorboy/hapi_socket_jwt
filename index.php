<?php
include_once('JWT.php');

$fp = fopen('secret.conf', 'r');
$fr = fread($fp, 1000);
fclose($fp);
$secret = $fr; // 비밀키 :: secret.conf 를 수정 하세요.
?>
<script src="http://localhost:7770/socket.io/socket.io.js"></script>
<script type="text/javascript">
	var Memo =io('http://localhost:7770/memo', {
		query: {
			id: 'test',
			jwt:'<?php echo JwtEnc('e', array('id'=>'test', 'iat'=>time()), $secret); ?>'
		}
	});
	Memo.on('connect', function(data) {});
	Memo.on('memo', function(data) {
		console.log(data);
	});
</script>