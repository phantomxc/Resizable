# Resizable HTML Elements

This is a simple class for making HTML elements easily resizable.

# Usage
This relies on the [Prototype.js Library](http://prototypejs.org)

Basic usage:
```
<script type="text/javascript" src="prototype.js"><script>
<script type="text/javascript" src="resizable.js"><script>

<script type="text/javascript">
    document.observe('dom:loaded', function(ev) {
        new Resizable($('elementID'));
    });
</script>
```

# Advanced Usage
```
Optional Arguments
```

# License
Copyright 2012 Cameron Wengert

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


