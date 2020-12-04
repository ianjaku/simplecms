<?php


namespace invacto\SimpleCMS\plugins\img;


use invacto\SimpleCMS\plugins\Plugin;
use invacto\SimpleCMS\plugins\PluginContext;

class ImgPlugin extends Plugin
{

	public function setup()
	{
		$this->addStyleFile(__DIR__ . "/img_style.css");
		$this->addScriptFile(__DIR__ . "/img_script.js");

		$this->addTemplateFunction('img', function (PluginContext $context, array $params) {
			$name = $params[0];
			$defaultValue = isset($params[1]) ? $params[1] : "";
			$alt = isset($params[2]) ? $params[2] : "";
			$other = isset($params[3]) ? $params[3] : "";

			$src = $context->findSnippet($name, null);
			if ($src == null) {
				$src = $defaultValue;
			} else {
				$src = '/storage/' . $src;
			}
			if ($this->authenticator->hasUser()) {
				return '<img src="'.$src.'" alt="'.$alt.'" data-simplecms-img="'.$name.'" '.$other.'>';
			} else {
				return '<img src="'.$src.'" alt="'.$alt.'"">';
			}
		});
	}

}