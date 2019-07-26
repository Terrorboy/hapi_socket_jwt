<?php
include_once('JWT.php');

// JWT Enc/Dec
function JwtEnc($type='e', $value=array(), $scret='', $alg='HS256') {
	$JWT = new JWT();
	if($type == 'e') return $JWT->encode($JWT->jsonEncode($value), $scret, $alg);
	else return $JWT->decode($value, $scret, array($alg));
}
	
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