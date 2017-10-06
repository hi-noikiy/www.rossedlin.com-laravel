<?php
/**
 * Created by PhpStorm.
 *
 * @author Ross Edlin <contact@rossedlin.com>
 *
 * Date: 01/10/2017
 * Time: 15:05
 *
 * @var Cryslo\Object\WordPress\Post $post
 */
?>
<header class="g-mb-30">
    <h2 class="h1 g-mb-15"><?= $post->getTitle() ?></h2>

    <ul class="list-inline d-sm-flex g-color-gray-dark-v4 mb-0">
        <li class="list-inline-item">
            <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
               href="#"><?= $post->getUser()->getDisplayName()?></a>
        </li>
        <li class="list-inline-item g-mx-10">/</li>
        <li class="list-inline-item">
            <?= $post->getDateFormatted() ?>
        </li>

        <?php /*
                <li class="list-inline-item g-mx-10">/</li>
                <li class="list-inline-item g-mr-10">
                    <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#">
                        <i class="icon-finance-206 u-line-icon-pro align-middle g-pos-rel g-top-1 mr-1"></i>
                        24
                    </a>
                </li>
                <li class="list-inline-item ml-auto">
                    <i class="icon-eye u-line-icon-pro align-middle mr-1"></i> Views 3821
                </li>
                */ ?>
    </ul>

    <hr class="g-brd-gray-light-v4 g-my-15">

    <?php /*
            <ul class="list-inline text-uppercase mb-0">
                <li class="list-inline-item g-mr-10">
                    <strong class="align-middle g-font-size-24">423</strong>
                </li>
                <li class="list-inline-item g-mr-10">
                    <span class="g-color-gray-dark-v5">|</span>
                </li>
                <li class="list-inline-item g-mr-10">
                    <a class="btn u-btn-facebook g-font-size-12 rounded g-px-20--sm g-py-10" href="#">
                        <i class="fa fa-facebook g-mr-5--sm"></i> <span
                                class="g-hidden-xs-down">Share on Facebook</span>
                    </a>
                </li>
                <li class="list-inline-item g-mr-10">
                    <a class="btn u-btn-twitter g-font-size-12 rounded g-px-20--sm g-py-10" href="#">
                        <i class="fa fa-twitter g-mr-5--sm"></i> <span class="g-hidden-xs-down">Tweet on Twitter</span>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a class="btn u-btn-lightred g-font-size-12 rounded g-py-10" href="#">
                        <i class="fa fa-pinterest"></i>
                    </a>
                </li>
            </ul>
            */ ?>
</header>