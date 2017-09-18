<?php
/**
 * Created by PhpStorm.
 * User: Ross Edlin
 * Date: 04/09/2017
 * Time: 11:33
 */
?>
<section id="contact" class="g-pos-rel text-center">
    <div class="g-py-30 g-py-80--md">
        <div class="container">
            <div class="text-uppercase u-heading-v2-4--bottom g-brd-primary">
                <h4 class="g-line-height-1 g-font-weight-600 g-font-size-12 g-color-primary g-mb-20">
                    Contact me
                </h4>
                <h2 class="u-heading-v2__title g-font-weight-600 g-font-size-30 g-font-size-40--md g-theme-color-gray-dark-v1">
                    Get in touch</h2>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <address class="row g-color-gray-dark-v4 mb-0">
            <div class="col-sm-6 col-md-4 g-theme-bg-gray-dark-v1 px-0 g-py-60">
                <i class="icon-line icon-envelope-letter d-inline-block g-font-size-30 g-font-size-40--md g-color-primary g-mb-30"></i>
                <h3 class="text-uppercase g-font-size-11 g-theme-color-gray-light-v3 g-mb-5">Email</h3>
                <a class="g-font-size-16 g-color-white" href="mailto:@lang('contact.email')"><strong>@lang('contact.email')</strong></a>
            </div>

            <div class="col-sm-6 col-md-4 g-theme-bg-gray-dark-v2 px-0 g-py-60">
                <i class="icon-line icon-map d-inline-block g-font-size-30 g-font-size-40--md g-color-primary g-mb-30"></i>
                <h3 class="text-uppercase g-font-size-11 g-theme-color-gray-light-v3 g-mb-5">Current Location</h3>
                <strong class="g-font-size-16 g-color-white">@lang('contact.current-location')</strong>
            </div>

            <div class="col-sm-6 col-md-4 g-theme-bg-gray-dark-v1 px-0 g-py-60">
                <i class="icon-line icon-screen-smartphone d-inline-block g-font-size-30 g-font-size-40--md g-color-primary g-mb-30"></i>
                <h3 class="text-uppercase g-font-size-11 g-theme-color-gray-light-v3 g-mb-5">Phone number</h3>
                <a class="g-font-size-16 g-color-white" href="tel:@lang('contact.number')"><strong>@lang('contact.number')</strong></a>
            </div>
        </address>
    </div>

    <div id="contact" class="g-color-gray-dark-v5 g-bg-gray-light-v5 g-py-30 g-py-70--md">
        <div class="container">
            <div class="u-heading-v8-2 g-mb-60">
                <h2 class="h1 text-uppercase u-heading-v8__title g-font-weight-700 g-font-size-26 g-font-secondary g-color-gray-dark-v2 g-mb-25">
                    Have a questions?</h2>
                <p class="mb-0">Send me a message and I'll get back to you as soon as I can!</p>
            </div>

            <form>
                <div class="row">
                    <div class="col-md-6 form-group g-mb-30">
                        <input id="inputGroup1_1"
                               class="form-control g-font-size-default g-theme-color-gray-dark-v2 g-placeholder-inherit g-bg-white g-bg-white--focus g-brd-white g-brd-gray-light-v3--hover g-brd-gray-light-v3--focus g-rounded-1 g-py-13 g-px-12 g-transition-0_2 g-transition--ease-in"
                               type="text" placeholder="Your name">
                    </div>

                    <div class="col-md-6 form-group g-mb-30">
                        <input id="inputGroup1_2"
                               class="form-control g-font-size-default g-theme-color-gray-dark-v2 g-placeholder-inherit g-bg-white g-bg-white--focus g-brd-white g-brd-gray-light-v3--hover g-brd-gray-light-v3--focus g-rounded-1 g-py-13 g-px-12 g-transition-0_2 g-transition--ease-in"
                               type="tel" placeholder="Your phone">
                    </div>

                    <div class="col-md-6 form-group g-mb-30">
                        <input id="inputGroup1_4"
                               class="form-control g-font-size-default g-theme-color-gray-dark-v2 g-placeholder-inherit g-bg-white g-bg-white--focus g-brd-white g-brd-gray-light-v3--hover g-brd-gray-light-v3--focus g-rounded-1 g-py-13 g-px-12 g-transition-0_2 g-transition--ease-in"
                               type="text" placeholder="Subject">
                    </div>

                    <div class="col-md-12 form-group g-mb-30">
                            <textarea id="inputGroup1_5"
                                      class="form-control g-resize-none g-font-size-default g-theme-color-gray-dark-v2 g-placeholder-inherit g-bg-white g-bg-white--focus g-brd-white g-brd-gray-light-v3--hover g-brd-gray-light-v3--focus g-rounded-1 g-py-13 g-px-12 g-transition-0_2 g-transition--ease-in"
                                      rows="6" placeholder="Message"></textarea>
                    </div>
                </div>

                <div class="text-center">
                    <button class="btn u-btn-primary btn-md text-uppercase g-font-weight-700 g-font-size-12 rounded-0 g-px-25 g-py-10 mb-0"
                            type="submit" role="button">Send message
                    </button>
                </div>
            </form>
        </div>
    </div>

    <?php /*
    <!-- Google (Map) [custom] -->
    <div class="g-pos-rel g-height-500">
        <div id="gMap" class="js-g-map g-pos-abs w-100 h-100"
             data-type="custom"
             data-lat="40.674"
             data-lng="-73.946"
             data-zoom="12"
             data-title="Agency"
             data-styles='[
                 ["", "", [{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]],
                 ["", "labels", [{"visibility":"on"}]],
                 ["water", "", [{"color":"#bac6cb"}]]
               ]'
             data-pin="true"
             data-pin-icon="assets/img/pin.png"></div>
    </div>
    <!-- End Google (Map) [custom] -->
    */ ?>
</section>