<!DOCTYPE html>

<style>
	textarea { width: 95%; height: 300px; }
</style>

<textarea id="xsd"><?=file_get_contents('example.xsd');?></textarea>
<textarea id="show"><?=file_get_contents('example.xml');?></textarea>
<button id="validate">Validate</validate>

<script src="js/lib/require.js" data-main="js/main.js"></script>